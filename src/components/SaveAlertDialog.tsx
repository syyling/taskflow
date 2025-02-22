import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function SaveAlertDialog({ open, onOpenChange, onDiscard }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[360px]">
        <AlertDialogHeader className="gap-1.5">
          <AlertDialogTitle className="text-lg font-medium">변경사항이 저장되지 않았습니다.</AlertDialogTitle>
          <p className="text-sm">이대로 계속 진행하시겠습니까?</p>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel className="mt-0 sm:mt-0 text-sm h-8 px-3 bg-muted hover:bg-muted/80">
            취소
          </AlertDialogCancel>
          <AlertDialogAction className="text-sm h-8 px-3 text-white" onClick={onDiscard}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
