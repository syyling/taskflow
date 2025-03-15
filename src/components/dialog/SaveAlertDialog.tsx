import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx';

export default function SaveAlertDialog({ open, onOpenChange, onDiscard }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[360px] bg-background dark:bg-gray-800 border border-border dark:border-gray-600">
        <AlertDialogHeader className="gap-1.5">
          <AlertDialogTitle className="text-lg font-medium text-foreground">
            변경사항이 저장되지 않았습니다.
          </AlertDialogTitle>
          <p className="text-sm text-muted-foreground dark:text-gray-400">이대로 계속 진행하시겠습니까?</p>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel className="mt-0 sm:mt-0 text-sm h-8 px-3 bg-muted hover:bg-muted/80 dark:bg-gray-700 dark:hover:bg-gray-600">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-sm h-8 px-3 text-white bg-destructive hover:bg-destructive/80 dark:bg-red-600 dark:hover:bg-red-500"
            onClick={onDiscard}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
