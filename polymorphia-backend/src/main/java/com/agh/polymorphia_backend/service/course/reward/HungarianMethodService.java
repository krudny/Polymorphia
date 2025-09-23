package com.agh.polymorphia_backend.service.course.reward;

import com.agh.polymorphia_backend.model.course.reward.FlatBonusItem;
import com.agh.polymorphia_backend.model.course.reward.assigned.AssignedItem;
import com.agh.polymorphia_backend.model.criterion.CriterionGrade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;
import org.jgrapht.Graph;
import org.jgrapht.alg.matching.KuhnMunkresMinimalWeightBipartitePerfectMatching;
import org.jgrapht.graph.DefaultWeightedEdge;
import org.jgrapht.graph.SimpleWeightedGraph;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
@AllArgsConstructor
public class HungarianMethodService {
    HungarianMethodResult findOptimalMatchingUsingHungarian(
            List<AssignedItem> flatBonusItems,
            List<CriterionGrade> criteriaGrades) {

        if (flatBonusItems.isEmpty()) {
            return new HungarianMethodResult(new HashMap<>(), Double.MAX_VALUE);
        }

        int itemCount = flatBonusItems.size();
        int gradeCount = criteriaGrades.size();
        int maxSize = Math.max(itemCount, gradeCount);

        double[][] costMatrix = getCostMatrix(flatBonusItems, criteriaGrades);

        Graph<String, DefaultWeightedEdge> graph = createBipartiteGraph(
                costMatrix, flatBonusItems, criteriaGrades
        );

        KuhnMunkresMinimalWeightBipartitePerfectMatching<String, DefaultWeightedEdge> hungarian =
                createMatching(graph, maxSize);

        Set<DefaultWeightedEdge> matchingEdges = hungarian.getMatching().getEdges();

        double totalOptimalCost = hungarian.getMatching().getWeight();
        log.info("Total optimal compenesation: {}", totalOptimalCost);

        Map<CriterionGrade, AssignedItem> result = extractMatching(flatBonusItems, criteriaGrades, matchingEdges, graph);

        return HungarianMethodResult.builder()
                .matching(result)
                .totalCompensation(totalOptimalCost)
                .build();

    }

    BigDecimal calculateCompensation(AssignedItem assignedItem, CriterionGrade criterionGrade) {
        FlatBonusItem flatBonusItem = (FlatBonusItem) assignedItem.getReward();

        BigDecimal currentXp = criterionGrade.getXp();
        BigDecimal maxXp = criterionGrade.getCriterion().getMaxXp();
        BigDecimal xpBonus = flatBonusItem.getXpBonus();

        BigDecimal missingXp = maxXp.subtract(currentXp);

        return missingXp.min(xpBonus);
    }

    private Map<CriterionGrade, AssignedItem> extractMatching(List<AssignedItem> flatBonusItems, List<CriterionGrade> criteriaGrades, Set<DefaultWeightedEdge> matchingEdges, Graph<String, DefaultWeightedEdge> graph) {
        int itemCount = flatBonusItems.size();
        int gradeCount = criteriaGrades.size();
        int maxSize = Math.max(itemCount, gradeCount);

        Map<CriterionGrade, AssignedItem> result = new HashMap<>();

        for (DefaultWeightedEdge edge : matchingEdges) {
            int source = Integer.parseInt(graph.getEdgeSource(edge));
            int target = Integer.parseInt(graph.getEdgeTarget(edge));

            int itemVertex, gradeVertex;
            if (source < maxSize) {
                itemVertex = source;
                gradeVertex = target - maxSize;
            } else {
                itemVertex = target;
                gradeVertex = source - maxSize;
            }

            if (itemVertex < itemCount && gradeVertex < gradeCount) {
                CriterionGrade grade = criteriaGrades.get(gradeVertex);
                AssignedItem item = flatBonusItems.get(itemVertex);

                result.put(grade, item);
                log.info(result.toString());
            }
        }
        return result;
    }

    private KuhnMunkresMinimalWeightBipartitePerfectMatching<String, DefaultWeightedEdge> createMatching(Graph<String, DefaultWeightedEdge> graph, int maxSize) {
        Set<String> itemVertices = getVertices(0, maxSize);
        Set<String> gradeVertices = getVertices(maxSize, 2 * maxSize);

        return new KuhnMunkresMinimalWeightBipartitePerfectMatching<>(graph, itemVertices, gradeVertices);
    }

    private Set<String> getVertices(int start, int end) {
        return IntStream.range(start, end)
                .mapToObj(String::valueOf)
                .collect(Collectors.toSet());
    }

    private double[][] getCostMatrix(List<AssignedItem> flatBonusItems, List<CriterionGrade> criteriaGrades) {
        int itemCount = flatBonusItems.size();
        int gradeCount = criteriaGrades.size();
        int maxSize = Math.max(itemCount, gradeCount);

        double[][] costMatrix = new double[maxSize][maxSize];
        double maxValue = 0.0;
        for (int i = 0; i < maxSize; i++) {
            for (int j = 0; j < maxSize; j++) {
                if (i < itemCount && j < gradeCount) {
                    BigDecimal compensation = calculateCompensation(
                            flatBonusItems.get(i),
                            criteriaGrades.get(j)
                    );
                    costMatrix[i][j] = compensation.doubleValue();
                    maxValue = Math.max(maxValue, compensation.doubleValue());
                } else {
                    costMatrix[i][j] = Double.MAX_VALUE / 2;
                }
            }
        }

        transformMatrixToMinimizationProblem(maxSize, itemCount,
                gradeCount, costMatrix, maxValue);

        return costMatrix;
    }

    private void transformMatrixToMinimizationProblem(int maxSize, int itemCount, int gradeCount, double[][] costMatrix, double maxValue) {
        for (int i = 0; i < maxSize; i++) {
            for (int j = 0; j < maxSize; j++) {
                if (i < itemCount && j < gradeCount) {
                    costMatrix[i][j] = maxValue - costMatrix[i][j];
                }
            }
        }
    }

    private Graph<String, DefaultWeightedEdge> createBipartiteGraph(
            double[][] costMatrix,
            List<AssignedItem> flatBonusItems,
            List<CriterionGrade> criteriaGrades) {

        Graph<String, DefaultWeightedEdge> graph = new SimpleWeightedGraph<>(DefaultWeightedEdge.class);

        int itemCount = flatBonusItems.size();
        int gradeCount = criteriaGrades.size();
        int maxSize = Math.max(itemCount, gradeCount);

        addVertices(graph, maxSize);
        addEdges(costMatrix, maxSize, graph);

        return graph;
    }

    private void addEdges(double[][] costMatrix, int maxSize, Graph<String, DefaultWeightedEdge> graph) {
        for (int i = 0; i < maxSize; i++) {
            for (int j = 0; j < maxSize; j++) {
                DefaultWeightedEdge edge = graph.addEdge(String.valueOf(i), String.valueOf(maxSize + j));
                if (edge != null) {
                    graph.setEdgeWeight(edge, costMatrix[i][j]);
                }
            }
        }
    }

    private void addVertices(Graph<String, DefaultWeightedEdge> graph, int maxSize) {
        for (int i = 0; i < maxSize; i++) {
            graph.addVertex(String.valueOf(i));
            graph.addVertex(String.valueOf(maxSize + i));
        }
    }


    @Builder
    record HungarianMethodResult(
            Map<CriterionGrade, AssignedItem> matching,
            double totalCompensation
    ) {
    }

}
