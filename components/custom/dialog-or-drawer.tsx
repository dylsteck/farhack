'use client';

import { memo, useEffect, useMemo, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'

interface DialogOrDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

function DialogOrDrawerComponent({ open, onOpenChange, children }: DialogOrDrawerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isMobile = useIsMobile()

  const content = useMemo(() => {
    const isDesktop = !isMobile;
    if (!mounted) return null
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      )
    }
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    )
  }, [mounted, isMobile, open, onOpenChange, children])

  return content
}

export const DialogOrDrawer = memo(DialogOrDrawerComponent)