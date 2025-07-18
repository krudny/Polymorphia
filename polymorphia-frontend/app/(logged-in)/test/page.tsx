import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { SaveIcon, ShareIcon } from "lucide-react";

export default function Page() {
  const actions = [
    { icon: <span className="material-symbols">person</span>, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <span className="material-symbols">person</span>, name: "Print" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  return (
    <div className="w-[1000px] h-[800px] m-auto flex-centered">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        FabProps={{
          style: {
            backgroundColor: "#262626",
            color: "#FAFAFA",
            borderRadius: 8,
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} />
        ))}
      </SpeedDial>
    </div>
  );
}
