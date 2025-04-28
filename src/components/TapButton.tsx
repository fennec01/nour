import { Button, ButtonProps } from "@/components/ui/button";
import * as motion from "framer-motion/client";

export function TapButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      asChild
      className={className}
      {...props}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {children}
      </motion.button>
    </Button>
  );
}