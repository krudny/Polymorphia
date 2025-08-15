import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { PullRequestProps } from "@/components/grading/components/pull-request/types";

export default function PullRequest({ pullRequests }: PullRequestProps) {
  return (
    <div className="w-full overflow-y-scroll flex flex-col flex-1 gap-y-4 custom-scrollbar">
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
                text="Zapisz"
                className="w-full !border-3 !rounded-lg !py-1"
              />
              <ButtonWithBorder
                text="Edytuj"
                className="w-full !border-3 !rounded-lg !py-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
