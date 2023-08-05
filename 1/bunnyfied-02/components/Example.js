// components/Example.js
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  ChakraProvider,
  extendTheme,
  Box,
} from "@chakra-ui/react";

const steps = [
  { title: "First Phase", description: "The certification program commences." },
  {
    title: "Second Phase",
    description:
      "After finishing the articles, share the final photo on LinkedIn by tagging Bunnyfiedlabs.",
  },
  {
    title: "Third Phase",
    description:
      "Send an email to info@bunnyfiedlabs.com containing all the necessary proofs.",
  },
  {
    title: "Fourth Phase",
    description:
      "Accept the internship project challenge and proceed with the implementation of the provided project.",
  },
  {
    title: "Last Phase",
    description: "Submit the project and await the results.",
  },
];

function Example() {
  // The right tick will change when you change this index
  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "pink.500", // replace with the desired background color
          margin: 10,
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Stepper index={activeStep} orientation="vertical" height="400px" gap="0">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription color={"black"}>
                {step.description}
              </StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </ChakraProvider>
  );
}

export default Example;
