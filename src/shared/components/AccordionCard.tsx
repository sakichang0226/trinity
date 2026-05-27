import { type ReactNode } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

export interface AccordionCardProps {
  header: ReactNode
  children: ReactNode
}

export function AccordionCard({ header, children }: AccordionCardProps) {
  return (
    <Disclosure as="div" className="bg-white rounded-xl shadow-sm overflow-hidden">
      <DisclosureButton className="group w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
        {header}
      </DisclosureButton>
      <DisclosurePanel className="border-t border-gray-100 bg-gray-50 px-6 py-4">
        {children}
      </DisclosurePanel>
    </Disclosure>
  )
}
