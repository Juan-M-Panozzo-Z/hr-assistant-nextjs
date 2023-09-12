import { Box, Container, Section } from "@radix-ui/themes";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsPageLoading = () => {
    return (
        <Section>
            <Container>
                <Box className="md:w-4/5 mx-auto md:p-4">
                    <Table>
                        <TableCaption>
                            <Skeleton className="w-1/4 h-6" />
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <TableCell key={i}>
                                        <Skeleton className="w-3/4 h-6" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <TableCell key={i}>
                                            <Skeleton className="w-3/4 h-6" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Container>
        </Section>
    );
};

export default SettingsPageLoading;
