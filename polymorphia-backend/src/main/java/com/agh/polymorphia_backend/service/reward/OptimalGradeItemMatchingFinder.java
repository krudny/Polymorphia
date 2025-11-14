package com.agh.polymorphia_backend.service.reward;

import com.agh.polymorphia_backend.model.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.grade.Grade;
import com.google.ortools.sat.*;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class OptimalGradeItemMatchingFinder {
    private static final int SCALE = 10;

    public OptimizationResult findOptimalMatching(
            List<AssignedItem> flatBonusItems,
            List<Grade> grades) {

        if (flatBonusItems == null || grades == null ||
                flatBonusItems.isEmpty() || grades.isEmpty()) {
            return new OptimizationResult(new HashMap<>(), BigDecimal.valueOf(0.0));
        }

        int numItems = flatBonusItems.size();
        int numGrades = grades.size();

        CpModel model = new CpModel();

        BoolVar[][] y = getY(flatBonusItems, grades, model);

        IntVar[] recoveredXp = new IntVar[numGrades];
        int[] maxRecoveredBound = new int[numGrades];
        for (int i = 0; i < numGrades; i++) {
            BigDecimal missingXp = grades.get(i).getCriteriaGrades().stream()
                    .map(cg -> cg.getCriterion().getMaxXp().subtract(cg.getXp()))
                    .reduce(BigDecimal.valueOf(0.0), BigDecimal::add);
            int missingScaled = Math.max(0, scale(missingXp));
            maxRecoveredBound[i] = missingScaled;
            recoveredXp[i] = model.newIntVar(0, missingScaled, "r_" + i);
        }

        addItemUsedAtMostOnceConstraint(numItems, numGrades, y, model);
        addRecoveredMaxBonusConstraint(flatBonusItems, maxRecoveredBound, numItems, numGrades, y, model, recoveredXp);
        addRecoveredPointsMaximizationObjective(numGrades, recoveredXp, model);

        return getOptimizationResult(flatBonusItems, grades, model, y);
    }

    private OptimizationResult getOptimizationResult(List<AssignedItem> flatBonusItems, List<Grade> grades, CpModel model, BoolVar[][] y) {
        CpSolver solver = new CpSolver();
        solver.getParameters().setLogSearchProgress(true);

        CpSolverStatus status = solver.solve(model);

        if (status != CpSolverStatus.OPTIMAL && status != CpSolverStatus.FEASIBLE) {
            log.warn("No feasible solution found. Status: {}", status);
            return new OptimizationResult(new HashMap<>(), BigDecimal.valueOf(0.0));
        }

        Map<Grade, List<AssignedItem>> matching = getMatching(flatBonusItems, grades, solver, y);

        long objectiveScaled = Math.round(solver.objectiveValue());
        BigDecimal totalRecovered = descale(objectiveScaled);

        return new OptimizationResult(matching, totalRecovered);
    }

    private void addRecoveredMaxBonusConstraint(
            List<AssignedItem> flatBonusItems,
            int[] maxRecoveredBound,
            int numItems,
            int numGrades,
            BoolVar[][] y,
            CpModel model,
            IntVar[] recoveredXp
    ) {
        for (int i = 0; i < numGrades; i++) {
            LinearExprBuilder sumAssigned = LinearExpr.newBuilder();
            int missingScaled = maxRecoveredBound[i];

            for (int j = 0; j < numItems; j++) {
                FlatBonusItem bonusItem = (FlatBonusItem) Hibernate.unproxy(flatBonusItems.get(j).getReward());

                int bonusScaled = scale(bonusItem.getXpBonus());
                int effective = Math.min(bonusScaled, missingScaled);
                if (effective > 0) {
                    sumAssigned.addTerm(y[j][i], effective);
                }
            }

            model.addGreaterOrEqual(sumAssigned.build(), recoveredXp[i]);
        }
    }

    private void addRecoveredPointsMaximizationObjective(int numGrades, IntVar[] recoveredXp, CpModel model) {
        LinearExprBuilder exprBuilder = LinearExpr.newBuilder();
        for (int i = 0; i < numGrades; i++) {
            exprBuilder.addTerm(recoveredXp[i], 1);
        }
        model.maximize(exprBuilder.build());
    }

    private void addItemUsedAtMostOnceConstraint(int numItems, int numGrades, BoolVar[][] y, CpModel model) {
        for (int j = 0; j < numItems; j++) {
            LinearExprBuilder sumBuilder = LinearExpr.newBuilder();
            for (int i = 0; i < numGrades; i++) {
                sumBuilder.addTerm(y[j][i], 1);
            }
            model.addLessOrEqual(sumBuilder.build(), 1);
        }
    }

    private BoolVar[][] getY(List<AssignedItem> flatBonusItems, List<Grade> grades, CpModel model) {
        int numItems = flatBonusItems.size();
        int numGrades = grades.size();
        BoolVar[][] y = new BoolVar[numItems][numGrades];
        for (int j = 0; j < numItems; j++) {
            AssignedItem item = flatBonusItems.get(j);
            Long itemSectionId = ((FlatBonusItem) Hibernate.unproxy(item.getReward()))
                    .getEventSection().getId();

            for (int i = 0; i < numGrades; i++) {
                Long gradeSectionId = grades.get(i).getGradableEvent()
                        .getEventSection().getId();
                y[j][i] = model.newBoolVar("y_" + j + "_" + i);

                if (!itemSectionId.equals(gradeSectionId)) {
                    model.addEquality(y[j][i], 0);
                }
            }
        }
        return y;
    }

    private Map<Grade, List<AssignedItem>> getMatching(List<AssignedItem> flatBonusItems,
                                                       List<Grade> grades,
                                                       CpSolver solver,
                                                       BoolVar[][] y
    ) {
        int numItems = flatBonusItems.size();
        int numGrades = grades.size();

        Map<Grade, List<AssignedItem>> matching = new HashMap<>();
        for (int j = 0; j < numItems; j++) {
            for (int i = 0; i < numGrades; i++) {
                if (solver.booleanValue(y[j][i])) {
                    Grade grade = grades.get(i);
                    AssignedItem item = flatBonusItems.get(j);
                    matching.computeIfAbsent(grade, k -> new ArrayList<>()).add(item);
                }
            }
        }

        return matching;
    }

    private int scale(BigDecimal value) {
        if (value == null) return 0;
        return value.multiply(BigDecimal.valueOf(SCALE))
                .setScale(0, RoundingMode.HALF_UP)
                .intValue();
    }

    private BigDecimal descale(long scaledValue) {
        return BigDecimal.valueOf(scaledValue).divide(BigDecimal.valueOf(SCALE), 2, RoundingMode.HALF_UP);
    }

    @Builder
    public record OptimizationResult(
            Map<Grade, List<AssignedItem>> matching,
            BigDecimal totalCompensation
    ) {
    }
}