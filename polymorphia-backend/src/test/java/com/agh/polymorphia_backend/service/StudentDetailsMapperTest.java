package com.agh.polymorphia_backend.service;

import com.agh.polymorphia_backend.dto.response.user.StudentDetailsResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithNameResponseDto;
import com.agh.polymorphia_backend.dto.response.user.StudentDetailsWithoutNameResponseDto;
import com.agh.polymorphia_backend.model.hall_of_fame.HallOfFameEntry;
import com.agh.polymorphia_backend.model.user.UserType;
import com.agh.polymorphia_backend.service.mapper.StudentDetailsMapper;
import com.agh.polymorphia_backend.service.validation.AccessAuthorizer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StudentDetailsMapperTest {
    private static final String STUDENT_NAME = "Anna Nowak";
    public static final List<UserType> ROLES = List.of(UserType.COORDINATOR, UserType.INSTRUCTOR);

    @Mock
    private AccessAuthorizer accessAuthorizer;
    @InjectMocks
    private StudentDetailsMapper studentDetailsMapper;

    @Test
    void hallOfFameToStudentDetailsResponseDto_shouldReturnDetailsWithName_ForCoordinatorOrInstructor() {
        // Given
        HallOfFameEntry hof = mock(HallOfFameEntry.class);

        // When
        when(hof.getStudentName()).thenReturn(STUDENT_NAME);
        when(accessAuthorizer.hasAnyRole(ROLES)).thenReturn(true);
        StudentDetailsResponseDto result = studentDetailsMapper.hallOfFameToStudentDetailsResponseDto(hof);

        // Then
        assertThat(result).isInstanceOf(StudentDetailsWithNameResponseDto.class);
        assertThat(((StudentDetailsWithNameResponseDto) result).fullName()).isEqualTo(STUDENT_NAME);
    }

    @Test
    void hallOfFameToStudentDetailsResponseDto_shouldReturnDetailsWithoutName_ForStudent() {
        // Given
        HallOfFameEntry hof = mock(HallOfFameEntry.class);

        // When
        when(accessAuthorizer.hasAnyRole(ROLES)).thenReturn(false);
        StudentDetailsResponseDto result = studentDetailsMapper.hallOfFameToStudentDetailsResponseDto(hof);

        // Then
        verify(hof, never()).getStudentName();
        assertThat(result).isInstanceOf(StudentDetailsWithoutNameResponseDto.class);
    }
}
