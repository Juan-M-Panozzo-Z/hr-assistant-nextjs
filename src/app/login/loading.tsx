import { Box, Container, Section } from "@radix-ui/themes";
import { Skeleton } from "@/components/ui/skeleton";

const Login = () => {
    return (
        <Section className="min-h-screen grid place-items-center">
            <Container className="rounded-xl border p-6 shadow-md">
                <Box className="space-y-4">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-8 w-[250px]" />

                    <Box className="flex justify-between">
                        <Skeleton className="h-8 w-[100px]" />
                        <Skeleton className="h-8 w-[100px]" />
                    </Box>
                </Box>
            </Container>
        </Section>
    );
};

export default Login;
