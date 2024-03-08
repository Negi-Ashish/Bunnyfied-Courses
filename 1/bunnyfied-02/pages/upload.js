// pages/StepperPage.js
import { Box } from "@chakra-ui/react";
import UploadCSV from "../components/UploadCSV";

export default function StepperPage() {
  return (
    <Box p={4}>
      <UploadCSV />
    </Box>
  );
}
