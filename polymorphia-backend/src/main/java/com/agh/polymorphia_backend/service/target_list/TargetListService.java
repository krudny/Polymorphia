package com.agh.polymorphia_backend.service.target_list;

import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.CourseGroupsTargetListRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.GradeStatus;
import com.agh.polymorphia_backend.dto.request.target_list.GradingTargetListRequestDto;
import com.agh.polymorphia_backend.dto.response.target_list.*;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.hall_of_fame.SearchBy;
import com.agh.polymorphia_backend.model.hall_of_fame.SortOrder;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.repository.project.ProjectTargetDataView;
import com.agh.polymorphia_backend.service.course_groups.CourseGroupsService;
import com.agh.polymorphia_backend.service.gradable_event.GradableEventService;
import com.agh.polymorphia_backend.service.gradable_event.ShortGradeService;
import com.agh.polymorphia_backend.service.hall_of_fame.*;
import com.agh.polymorphia_backend.service.mapper.TargetListMapper;
import com.agh.polymorphia_backend.service.project.ProjectService;
import com.agh.polymorphia_backend.service.user.UserService;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TargetListService {
    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseGroupsService courseGroupsService;
    private final UserService userService;
    private final HallOfFameService hallOfFameService;
    private final TargetListMapper targetListMapper;
    private final ProjectService projectService;
    private final ShortGradeService shortGradeService;

    public List<StudentTargetResponseDto> getTargetListForCourseGroup(CourseGroupsTargetListRequestDto requestDto) {
        CourseGroup courseGroup = courseGroupsService.findCourseGroupForTeachingRoleUser(requestDto.getCourseGroupId());

        // This is ugly, but it should be fast and it reuses existing code
        HallOfFameRequestDto hofRequest = targetListMapper.toHofRequest(requestDto, courseGroup);
        OverviewFieldSort overviewFieldSort = targetListMapper.getOverviewFieldSort(hofRequest);
        Page<HallOfFameEntry> hallOfFameEntryPage =  hallOfFameService.getSortedByOverviewFields(hofRequest, overviewFieldSort.field());

        return targetListMapper.mapHofEntriesToStudentTargets(hallOfFameEntryPage);
    }

    public List<? extends TargetResponseDto> getTargetListForGrading(GradingTargetListRequestDto requestDto) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(requestDto.getGradableEventId());
        Course course = gradableEvent.getEventSection().getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        return switch (gradableEvent.getEventSection().getEventSectionType()) {
            case PROJECT -> {
                Map<Long, List<ProjectTargetDataView>> groupTargets =
                        projectService.getProjectTargets(requestDto.getGradableEventId(),
                                userService.getCurrentUser().getUserId(),
                                requestDto.getGroups().stream().findFirst().filter(group -> group.equals("assigned"))
                                        .isEmpty()).stream().collect(
                                Collectors.groupingBy(ProjectTargetDataView::projectGroupId));

                groupTargets.entrySet().removeIf(entry -> {
                    List<ProjectTargetDataView> members = entry.getValue();

                    if (!Objects.equals(requestDto.getSearchTerm(), "")) {
                        boolean matchesSearchTerm = members.stream()
                                .map(member -> requestDto.getSearchBy() == SearchBy.STUDENT_NAME ? member.fullName() :
                                        member.animalName()).anyMatch(
                                        name -> name.toLowerCase().contains(requestDto.getSearchTerm().toLowerCase()));

                        if (!matchesSearchTerm) {
                            return true;
                        }
                    }

                    if (requestDto.getGradeStatus() != GradeStatus.ALL) {
                        boolean isGraded = members.stream().allMatch(member -> member.gradeId() != null);
                        return requestDto.getGradeStatus() == GradeStatus.GRADED && !isGraded ||
                                requestDto.getGradeStatus() == GradeStatus.UNGRADED && isGraded;
                    }

                    return false;
                });

                yield groupTargets.entrySet().stream().map((entry) -> {
                    Long courseGroupId = entry.getKey();
                    List<StudentTargetDataResponseDto> members = entry.getValue().stream()
                            .map(projectTargetDataView -> StudentTargetDataResponseDto.builder()
                                    .id(projectTargetDataView.studentId()).fullName(projectTargetDataView.fullName())
                                    .animalName(projectTargetDataView.animalName())
                                    .evolutionStage(projectTargetDataView.evolutionStage())
                                    .group(projectTargetDataView.group()).imageUrl(projectTargetDataView.imageUrl())
                                    .gainedXp(projectTargetDataView.gainedXp()).build())
                            .sorted(getMemberComparator(requestDto.getSortBy(), requestDto.getSortOrder()))
                            .toList();

                    return StudentGroupTargetResponseDto.builder().groupId(courseGroupId).members(members).groupType(
                            shortGradeService.areAllGradesSame(members.stream()
                                    .map(member -> shortGradeService.getShortGradeWithoutAuthorization(gradableEvent,
                                            member.id(), course)).toList()) ? GroupTargetType.MATCHING : GroupTargetType.DIVERGENT).build();

                }).sorted(getGroupComparator(requestDto.getSortBy(), requestDto.getSortOrder())).toList();
            }
            case ASSIGNMENT, TEST -> gradableEventService.getStudentTargets(
                            userService.getCurrentUser().getUserId(), requestDto).stream()
                    .map(studentData -> StudentTargetResponseDto.builder().id(studentData.id()).student(studentData)
                            .build()).toList();
        };
    }

    private Comparator<StudentTargetDataResponseDto> getBaseMemberComparator(String sortBy) {
        return switch (sortBy) {
            case "animalName" -> Comparator.comparing(
                    StudentTargetDataResponseDto::animalName,
                    Comparator.nullsLast(String::compareToIgnoreCase)
            );
            case "total" -> Comparator.comparing(
                    StudentTargetDataResponseDto::gainedXp,
                    Comparator.nullsFirst(Comparator.naturalOrder())
            );
            default -> Comparator.comparing(
                    StudentTargetDataResponseDto::fullName,
                    Comparator.nullsLast(String::compareToIgnoreCase)
            );
        };
    }

    private Comparator<StudentTargetDataResponseDto> getMemberComparator(String sortBy, SortOrder sortOrder) {
        Comparator<StudentTargetDataResponseDto> comparator = getBaseMemberComparator(sortBy);

        if (sortOrder == SortOrder.DESC) {
            comparator = comparator.reversed();
        }

        return comparator;
    }

    private Comparator<StudentGroupTargetResponseDto> getGroupComparator(String sortBy, SortOrder sortOrder) {
        Comparator<StudentTargetDataResponseDto> baseMemberComparator = getBaseMemberComparator(sortBy);

        Function<StudentGroupTargetResponseDto, StudentTargetDataResponseDto> getFirstMember =
                group -> (group.members() == null || group.members().isEmpty())
                        ? null
                        : group.members().getFirst();

        Comparator<StudentGroupTargetResponseDto> groupComparator =
                Comparator.comparing(
                        getFirstMember,
                        Comparator.nullsLast(baseMemberComparator)
                );

        if (sortOrder == SortOrder.DESC) {
            groupComparator = groupComparator.reversed();
        }

        return groupComparator;
    }

    public List<String> getGroupsForGradingTargetListFilters(Long gradableEventId) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(gradableEventId);
        Course course = gradableEvent.getEventSection().getCourse();

        return switch (gradableEvent.getEventSection().getEventSectionType()) {
            // Course access authorization is performed inside findAllCourseGroupNames
            case ASSIGNMENT, TEST -> courseGroupsService.findAllCourseGroupNames(course.getId());
            case PROJECT -> {
                accessAuthorizer.authorizeCourseAccess(course);
                if (userService.getCurrentUserRole() == UserType.COORDINATOR) {
                    yield List.of("assigned");
                } else {
                    yield List.of();
                }
            }
        };
    }
}
