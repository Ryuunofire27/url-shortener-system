import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogDescription, DialogHeader, DialogVoidContent } from './dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { memo } from 'react';

const _Loader = ({ className, open }: { className?: string, open: boolean }) => {
  return (
    <Dialog open={open} defaultOpen={false}>
      <DialogHeader>
        <DialogTitle className="hidden">Loading...</DialogTitle>
        <DialogDescription className="hidden">Please wait while we load the data</DialogDescription>
      </DialogHeader>
      <DialogVoidContent className="sm:max-w-[425px] items-center justify-center">
        <Loader2
          className={cn('my-28 h-16 w-16 animate-spin', className)}
        />
      </DialogVoidContent>
    </Dialog>
  );
};

export default memo(_Loader);