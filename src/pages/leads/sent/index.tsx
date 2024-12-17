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
import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const appText = new Map<string, string>([
  ['all', 'All Leads'],
  ['verified', 'Verified'],
  ['notVerified', 'Not Verified'],
])

// Sample data for demonstration
const sampleLeads = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    college: 'ABC University',
    course: 'Computer Science',
    verified: true,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phoneNumber: '098-765-4321',
    college: 'XYZ College',
    course: 'Business Administration',
    verified: false,
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phoneNumber: '555-123-4567',
    college: 'DEF Institute',
    course: 'Electrical Engineering',
    verified: true,
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob@example.com',
    phoneNumber: '777-888-9999',
    college: 'GHI University',
    course: 'Psychology',
    verified: false,
  },
]

const SentLeads = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [appType, setAppType] = useState('all')

  const filteredLeads = useMemo(() => {
    return sampleLeads.filter((lead) => {
      const matchesSearch =
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phoneNumber.includes(searchTerm) ||
        lead.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.course.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType =
        appType === 'all' ||
        (appType === 'verified' && lead.verified) ||
        (appType === 'notVerified' && !lead.verified)

      return matchesSearch && matchesType
    })
  }, [searchTerm, appType])

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
          <h1 className='text-2xl font-bold tracking-tight'>
            Leads from vendors
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your leads from vendors!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter leads...'
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
                <SelectItem value='verified'>Verified</SelectItem>
                <SelectItem value='notVerified'>Not Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leads Table */}
        <div className='mt-6 rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.firstName}</TableCell>
                  <TableCell>{lead.lastName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phoneNumber}</TableCell>
                  <TableCell>{lead.college}</TableCell>
                  <TableCell>{lead.course}</TableCell>
                  <TableCell>{lead.verified ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default SentLeads
