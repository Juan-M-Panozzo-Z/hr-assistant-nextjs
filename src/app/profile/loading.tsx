import { Section, Container, Box } from "@radix-ui/themes";
import SkeletonInput from "@/components/SkeletonInput";

const ProfilePageLoading = () => {
    return (
        <Section>
            <Container className="md:w-4/5 mx-auto md:p-4">
                <div className="grid md:grid-cols-2 gap-4 p-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonInput key={i} />
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ProfilePageLoading;
