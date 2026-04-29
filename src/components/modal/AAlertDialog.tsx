import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDialogCustomProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  onAction: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AAlertDialog({
  children,
  title = "Are you sure?",
  description = "Are you sure you want to continue?",
  cancelText = "Cancel",
  actionText = "Confirm",
  onAction,
  open,
  onOpenChange,
}: AlertDialogCustomProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-[320px] text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-primary-foreground text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center">
          <AlertDialogCancel className="hover:text-foreground">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-accent bg-destructive/90 hover:bg-destructive"
            onClick={onAction}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
