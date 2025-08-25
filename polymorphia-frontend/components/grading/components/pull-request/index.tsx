import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { PullRequestProps } from "@/components/grading/components/pull-request/types";
import toast from "react-hot-toast";
import GradingComponentWrapper from "@/components/grading/components/grading-wrapper";

export default function PullRequest({ pullRequests }: PullRequestProps) {
  const topComponent = <h1 className="text-5xl">Pull Request</h1>;

  const mainComponent = (
    <>
      {pullRequests.map((pullRequest, index) => (
        <div key={index} className="flex flex-col">
          <h2 className="text-4xl">{pullRequest.name}</h2>
          <h3 className="text-3xl text-primary-gray my-3 hover:cursor-pointer">
            {pullRequest.url}
          </h3>
          <div className="flex gap-x-2 h-fit mt-4">
            <ButtonWithBorder
              text="Zobacz"
              className="w-full !border-3 !rounded-lg !py-1"
              onClick={() => window.open(pullRequest.url, "_blank")}
            />
            <ButtonWithBorder
              text="Edytuj"
              className="w-full !border-3 !rounded-lg !py-1"
              onClick={() => toast.error("Not implemented yet!")}
            />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <GradingComponentWrapper
      topComponent={topComponent}
      mainComponent={mainComponent}
    />
  );
}
