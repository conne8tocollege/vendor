import { useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical, Recycle, SquarePlus, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useLocation } from 'react-router-dom'
import { Search } from '@/components/search'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import { Course } from '@/containers/interfaces'
import { UpdateCourseModal } from '../components/updateCourseModal'

export default function Courses() {
  const location = useLocation()
  const { state } = location || {}
  const courses = state?.courses || []
  const college = state?.college || {}
  const { register } = useForm()

  const [sort, setSort] = useState('ascending')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    fees: 0,
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = (e: any) => {
    e.preventDefault()
    const collegeId = courses[0].collegeId
    console.log(formData, collegeId)
  }

  const handleCourseUpdate = (course: Course) => {
    setIsModalOpen(true)
    setSelectedCourse(course)
  }

  const filteredCourses = courses
    .filter((course: any) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Search />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Filters and Sorting ===== */}
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            All Courses Offered By {college}
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of courses!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter courses...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex gap-4 '>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className='w-16'>
                <SelectValue>
                  <IconAdjustmentsHorizontal size={18} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent align='end'>
                <SelectItem value='ascending'>
                  <div className='flex items-center gap-4'>
                    <IconSortAscendingLetters size={16} />
                    <span>Ascending</span>
                  </div>
                </SelectItem>
                <SelectItem value='descending'>
                  <div className='flex items-center gap-4'>
                    <IconSortDescendingLetters size={16} />
                    <span>Descending</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  {' '}
                  <SquarePlus className='mr-2 size-4' /> Add a course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Add a new course</DialogTitle>
                <DialogDescription>
                  Fill out the details below to add a new course.
                </DialogDescription>
                <form className='space-y-4'>
                  <Input
                    placeholder='Course Name'
                    {...register('name', { required: true })}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder='Duration'
                    {...register('duration', { required: true })}
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder='Fees'
                    {...register('fees', { required: true })}
                    value={formData.fees}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder='Description'
                    {...register('description', { required: true })}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Button type='submit' onClick={handleSave}>
                    Add Course
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator className='shadow' />

        {/* ===== Course List ===== */}
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredCourses.map((courses: Course) => (
            <li
              key={college.id}
              className='rounded-lg border p-4 hover:shadow-md'
            >
              <div className='mb-8 flex items-center justify-between'>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                >
                  {courses?.imageUrl ? (
                    <img src={courses?.imageUrl} alt={courses.name} />
                  ) : (
                    <img src='../src/assets/vite.svg' />
                  )}
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className='rounded-lg p-4 font-semibold hover:bg-muted focus:outline-none'>
                        {/* Use 3 dots for the menu trigger */}
                        <span>
                          <EllipsisVertical size={20} strokeWidth={1.3} />
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56'>
                      <DropdownMenuLabel>College Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className='cursor-pointer'
                          onClick={() => handleCourseUpdate(courses)}
                        >
                          <Recycle className='mr-2 size-4' />
                          <span>Update Course</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='mb-1 mt-3 cursor-pointer bg-destructive/5 hover:bg-destructive/10'>
                        <Trash2 className='mr-2 size-4 text-destructive ' />
                        <span className='text-destructive '>Delete Course</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <UpdateCourseModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onUpdate={handleCourseUpdate}
                  course={selectedCourse} // Pass the selected service
                />
              </div>
              <div>
                <h2 className='mb-1 font-semibold'>{courses.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{courses.fees}</p>
                <p className='line-clamp-2 text-gray-500'>
                  {courses.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Layout.Body>
    </Layout>
  )
}
