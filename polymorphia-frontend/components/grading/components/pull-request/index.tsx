import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { PullRequestProps } from "@/components/grading/components/pull-request/types";
import toast from "react-hot-toast";

export default function PullRequest({ pullRequests }: PullRequestProps) {
  return (
    <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4 custom-scrollbar mt-16 py-3">
      <div className="w-full max-w-sm mx-auto bg-blue-600">
        <h1 className="text-6xl">Pull Request</h1>
        {pullRequests.map((pullRequest, index) => (
          <div key={index} className="flex flex-col">
            <h2 className="text-4xl my-5">{pullRequest.name}</h2>
            <h3 className="text-3xl text-secondary-gray hover:cursor-pointer">
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
      </div>
    </div>
  );
}
