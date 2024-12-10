import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserNav } from '@/components/user-nav'
import { useState } from 'react'

const appText = new Map<string, string>([
  ['all', 'All Vendors'],
  ['verified', 'Verified Vendors'],
  ['notVerified', 'Not Verified Vendors'],
])
const List = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [appType, setAppType] = useState('all')
  return (
    <Layout fixed>
      {/* ======HEADER====== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Search />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>
      {/* =======BODY====== */}
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>List of vendors</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of vendors!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter vendors...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={appType} onValueChange={setAppType}>
              <SelectTrigger className='w-36'>
                <SelectValue>{appText.get(appType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='verfied'>Verified Vendors</SelectItem>
                <SelectItem value='notVerified'>
                  Not Verified Vendors
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default List
