import Modal from "@/components/modal/Modal";
import {useContext, useEffect, useLayoutEffect, useRef} from "react";
import {HallOfFameContext} from "@/components/providers/HallOfFameContext";
import {ArrowDown, ArrowUp} from "lucide-react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import {hallOfFameConfirmAction} from "@/services/hall-of-fame/Helpers";
import {HallOfFameFilterID, HallOfFameFilterOption} from "@/interfaces/hall-of-fame/HallOfFameLogicInterfaces";
import gsap from "gsap";

export default function FiltersModal() {
    const { filtersState, setAppliedFiltersState, filtersDispatch, setIsModalOpen} = useContext(HallOfFameContext);

    const handleSelect = (filterId: HallOfFameFilterID, option: HallOfFameFilterOption) => {
        filtersDispatch({
            type: option.isSelected ? "REMOVE_CATEGORY_SELECTION" : "ADD_CATEGORY_SELECTION",
            payload: { id: filterId, value: option.value},
        });
    };

    const refs = useRef<Record<HallOfFameFilterID, HTMLDivElement | null>>({
        sort: null,
        sortBy: null,
        groups: null,
        rankingOptions: null,
    });

    useLayoutEffect(() => {
        filtersState.forEach((filter) => {
            const el = refs.current[filter.id];
            if (!el) return;

            if (filter.isOpen) {
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    marginTop: "0.5rem",
                    duration: 0.4,
                    ease: "power2.inOut",
                });
            } else {
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    marginTop: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                });
            }
        });
    }, [filtersState]);

    useEffect(() => {
        console.log(filtersState);
    }, [filtersState])

    return (
        <Modal
            title="Filtry"
            onClosed={() => {
                filtersDispatch({ type: "CLOSE_ALL_CATEGORIES" });
                setIsModalOpen(false);
            }}
        >
            <div className="overflow-visible">
                <div className="w-96 flex flex-col">
                    {filtersState.map((filter) => (
                        <div key={filter.id} className="flex flex-col my-2">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl">{filter.name}</h1>
                                <div
                                    className="flex items-center gap-x-1 cursor-pointer hover:opacity-70 transition-opacity"
                                    onClick={() =>
                                        filtersDispatch({
                                            type: "TOGGLE_CATEGORY",
                                            payload: { id: filter.id },
                                        })
                                    }
                                >
                                    {filter.isOpen ? (
                                        <>
                                            <ArrowUp className="w-5 h-5 transition-transform duration-300" />
                                            <h1 className="text-2xl">Zamknij</h1>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowDown className="w-5 h-5 transition-transform duration-300" />
                                            <h1 className="text-2xl">Otwórz</h1>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div
                                ref={(el) => (refs.current[filter.id] = el)}
                                style={{
                                    overflow: "hidden",
                                    height: 0,
                                    opacity: 0,
                                    marginTop: 0,
                                }}
                            >
                                <div className="grid grid-cols-4 gap-2 text-xl my-2">
                                    {filter.options
                                        .map((option) => (
                                                <div
                                                    key={option.value}
                                                    onClick={() => handleSelect(filter.id, option)}
                                                    className={`w-full rounded-md flex-centered px-2 py-1 text-primary-dark cursor-pointer transition-colors duration-150 ease-in-out ${
                                                        option.isSelected
                                                            ? "bg-primary-dark text-secondary-light dark:bg-secondary-light shadow-md"
                                                            : "bg-primary-gray "
                                                    }`}
                                                >
                                                    {option.label}
                                                </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full mt-5">
                    <ButtonWithBorder
                        text={"Potwierdź zmiany"}
                        className="w-full rounded-md"
                        size="sm"
                        onClick={() => {
                            if (hallOfFameConfirmAction(filtersState, setAppliedFiltersState)) {
                                filtersDispatch({ type: "CLOSE_ALL_CATEGORIES" });
                                setIsModalOpen(false);
                            }
                        }}
                    />
                </div>
            </div>
        </Modal>
    )
}