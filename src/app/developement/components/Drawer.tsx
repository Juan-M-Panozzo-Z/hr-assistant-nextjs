import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";

const Drawer = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Sheet>
                <SheetTrigger className="fixed top-0 bottom-0 left-1">
                    <Button variant="default" size={"icon"}>
                        <DoubleArrowRightIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] rounded-md">
                    <p>Hola mundo</p>
                </SheetContent>
            </Sheet>
            <Box className="ml-12">{children}</Box>
        </>
    );
};

export default Drawer;
