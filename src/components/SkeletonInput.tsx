import { Skeleton } from "./ui/skeleton";
import { Box } from "@radix-ui/themes";

const SkeletonInput = () => (
    <Box className="space-y-2 my-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-[250px]" />
    </Box>
);

export default SkeletonInput;
