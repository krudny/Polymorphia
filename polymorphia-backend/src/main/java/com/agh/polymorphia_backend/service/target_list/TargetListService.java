package com.agh.polymorphia_backend.service.target_list;

import com.agh.polymorphia_backend.dto.request.hall_of_fame.HallOfFameRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.CourseGroupsTargetListRequestDto;
import com.agh.polymorphia_backend.dto.request.target_list.GradingTargetListRequestDto;
import com.agh.polymorphia_backend.dto.response.target_list.*;
import com.agh.polymorphia_backend.model.course.Course;
import com.agh.polymorphia_backend.model.course.CourseGroup;
import com.agh.polymorphia_backend.model.gradable_event.GradableEvent;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
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

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TargetListService {
    private final GradableEventService gradableEventService;
    private final AccessAuthorizer accessAuthorizer;
    private final CourseGroupsService courseGroupsService;
    private final UserService userService;
    private final HallOfFameService hallOfFameService;
    private final HallOfFameSortSpecResolver hallOfFameSortSpecResolver;
    private final TargetListMapper targetListMapper;
    private final ProjectService projectService;
    private final ShortGradeService shortGradeService;

    public List<StudentTargetResponseDto> getTargetListForCourseGroup(CourseGroupsTargetListRequestDto requestDto) {
        CourseGroup courseGroup = courseGroupsService.findCourseGroupForTeachingRoleUser(requestDto.getCourseGroupId());

        // This is ugly, but it should be fast and it reuses existing code
        HallOfFameRequestDto hofRequest = HallOfFameRequestDto.builder()
                .sortBy(requestDto.getSortBy())
                .groups(List.of(courseGroup.getName()))
                .courseId(courseGroup.getCourse().getId())
                .searchBy(requestDto.getSearchBy())
                .searchTerm(requestDto.getSearchTerm())
                .sortOrder(requestDto.getSortOrder())
                .page(0)
                .size(Integer.MAX_VALUE)
                .build();

        HallOfFameSortSpec sortSpec = hallOfFameSortSpecResolver.resolve(hofRequest);
        Page<HallOfFameEntry> hallOfFameEntryPage = switch (sortSpec) {
            case OverviewFieldSort overviewFieldSort ->
                    hallOfFameService.getSortedByOverviewFields(hofRequest, overviewFieldSort.field());
            case EventSectionSort eventSectionSort ->
                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                            "Nie udało się wczytać listy członków grupy zajęciowej.");
        };

        return targetListMapper.mapHofEntriesToStudentTargets(hallOfFameEntryPage);
    }

    public List<? extends TargetResponseDto> getTargetListForGrading(GradingTargetListRequestDto requestDto) {
        GradableEvent gradableEvent = gradableEventService.getGradableEventById(requestDto.getGradableEventId());
        Course course = gradableEvent.getEventSection().getCourse();
        accessAuthorizer.authorizeCourseAccess(course);

        return switch (gradableEvent.getEventSection().getEventSectionType()) {
            case PROJECT -> {
                Map<Long, List<StudentTargetDataResponseDto>> groupTargets =
                        projectService.getProjectTargets(requestDto.getGradableEventId(),
                                userService.getCurrentUser().getUserId(),
                                requestDto.getGroups().stream().findFirst().filter(group -> group.equals("assigned"))
                                        .isEmpty()).stream().collect(
                                Collectors.groupingBy(ProjectTargetDataView::projectGroupId, Collectors.mapping(
                                        projectTargetDataView -> StudentTargetDataResponseDto.builder()
                                                .id(projectTargetDataView.studentId())
                                                .fullName(projectTargetDataView.fullName())
                                                .animalName(projectTargetDataView.animalName())
                                                .evolutionStage(projectTargetDataView.evolutionStage())
                                                .group(projectTargetDataView.group())
                                                .imageUrl(projectTargetDataView.imageUrl())
                                                .gainedXp(projectTargetDataView.gainedXp()).build(),
                                        Collectors.toList())));

                yield groupTargets.entrySet().stream().map((entry) -> {
                    Long courseGroupId = entry.getKey();
                    List<StudentTargetDataResponseDto> members = entry.getValue();

                    return StudentGroupTargetResponseDto.builder().groupId(courseGroupId).members(members).groupType(
                            shortGradeService.areAllGradesSame(members.stream()
                                    .map(member -> shortGradeService.getShortGradeWithoutAuthorization(gradableEvent,
                                            member.id(), course)).toList()) ? GroupTargetType.MATCHING : GroupTargetType.DIVERGENT).build();

                }).toList();
            }
            case ASSIGNMENT, TEST -> {
                // TODO
                yield null;
            }
        };
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
