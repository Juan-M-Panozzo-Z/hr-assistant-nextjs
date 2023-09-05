import SkeletonInput from "@/components/SkeletonInput";
import { Skeleton } from "@/components/ui/skeleton";
import { Box, Container, Section } from "@radix-ui/themes";

const Loading = () => {
    return (
        <Section className="min-h-screen grid place-items-center">
            <Container className="rounded-xl border p-6 shadow-md">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonInput key={i} />
                ))}
                <Box className="flex justify-between gap-2">
                    <Skeleton className="h-8 w-[100px]" />
                    <Skeleton className="h-8 w-[100px]" />
                </Box>
            </Container>
        </Section>
    );
};

export default Loading;