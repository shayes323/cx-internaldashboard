import { PublishersChartsPlacement } from "./PublishersChartsPlacement";
import { PublishersSpacedPanels } from "./PublishersSpacedPanels";
import { RFChartsPlacement } from "./RFChartsPlacement";
import { RFSpacedPanels } from "./RFSpacedPanels";

export const PublishersContent: any = () => {
  return (
    <>
      <div>
        <PublishersSpacedPanels />
      </div>
      <PublishersChartsPlacement />
    </>
  );
};

export const RemoteFeedsContent: any = () => {
  return (
    <>
      <div>
        <RFSpacedPanels />
      </div>
      <RFChartsPlacement />
    </>
  );
};
