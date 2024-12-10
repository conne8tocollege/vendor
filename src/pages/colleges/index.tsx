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
  ArrowUpSquare,
  EllipsisVertical,
  Eye,
  Recycle,
  SquarePlus,
  Trash2,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { College } from '@/containers/interfaces'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Colleges } from '@/api'
import Loader from '@/components/loader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UpdateModal } from './components/updateModal'

const appText = new Map<string, string>([
  ['all', 'All Colleges'],
  ['ranked', 'Ranked'],
  ['notRanked', 'Not Ranked'],
])

export default function CollegeList() {
  const [sort, setSort] = useState('ascending')
  const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    imageUrl: '',
    isRanked: false,
  })
  console.log(selectedFile)

  const navigate = useNavigate()
  const { register } = useForm()

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const response = await Colleges.getAllColleges()
      return Array.isArray(response.data) ? response.data : []
    },
  })

  const createCollegeMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await Colleges.createCollege(payload)
      return response
    },

    onSuccess: (res) => {
      if (res.status === 201) {
        toast.success('College created successfully')
        setFormData({
          name: '',
          address: '',
          imageUrl: '',
          isRanked: false,
        })
        setImageUrl(null)
        setSelectedFile(null)
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error('Error creating college')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setIconPreview(URL.createObjectURL(file))
    }
  }

  const handleIconUpload = (e: any) => {
    e.preventDefault()
  }

  const handleIsRankedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isRanked: e.target.checked,
    }))
  }

  const handleSave = (e: any) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      address: formData.address,
      imageUrl,
      isRanked: formData.isRanked,
    }
    createCollegeMutation.mutate(payload)
  }

  const handelViewCourses = (courses: any, college: any) => {
    navigate(`/colleges/courses`, {
      state: {
        courses,
        college,
      },
    })
  }

  const handleUpdateCollege = (college: College) => {
    setSelectedCollege(college)
    setIsModalOpen(true)
  }
  const handleCollegeUpdate = () => {}

  const filteredColleges = colleges
    .filter((college: College) =>
      appType === 'ranked'
        ? college.isRanked
        : appType === 'notRanked'
          ? !college.isRanked
          : true
    )
    .filter((college: College) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: College, b: College) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )

  if (isLoading) {
    return <Loader />
  }

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

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>All Colleges</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your colleges!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter colleges...'
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
                <SelectItem value='ranked'>Ranked</SelectItem>
                <SelectItem value='notRanked'>Not Ranked</SelectItem>
              </SelectContent>
            </Select>
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
                  <SquarePlus className='mr-2 size-4' /> Add College
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Create New College</DialogTitle>
                <DialogDescription>
                  Fill out the details below to add a new college.
                </DialogDescription>
                <form className='space-y-4'>
                  <Input
                    placeholder='College Name'
                    {...register('name', { required: true })}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder='Address'
                    {...register('address', { required: true })}
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={formData.isRanked}
                      onChange={handleIsRankedChange}
                      className='mr-2'
                    />
                    <span>Is Ranked</span>
                  </label>
                  {iconPreview && (
                    <img
                      src={iconPreview}
                      alt='Icon Preview'
                      className='mt-2 h-16 w-16'
                    />
                  )}
                  {!imageUrl ? (
                    <Button onClick={handleIconUpload}>Upload Icon</Button>
                  ) : (
                    <Button type='submit' onClick={handleSave}>
                      Add College
                    </Button>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className='shadow' />
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredColleges.map((college: College) => (
            <li
              key={college.id}
              className='rounded-lg border p-4 hover:shadow-md'
            >
              <div className='mb-8 flex items-center justify-between'>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                >
                  {college.imageUrl ? (
                    <img src={college.imageUrl} alt={college.name} />
                  ) : (
                    <img src='./src/assets/vite.svg' />
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
                        <DropdownMenuItem className='cursor-pointer'>
                          <Eye className='mr-2 size-4' />
                          <span
                            onClick={() =>
                              handelViewCourses(college.courses, college.name)
                            }
                          >
                            View Courses
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                          <ArrowUpSquare className='mr-2 size-4' />
                          <span
                            className={`${
                              college.isRanked
                                ? 'text-primary'
                                : 'text-destructive'
                            }`}
                          >
                            {' '}
                            {college.isRanked ? 'Ranked' : 'Not Ranked'}
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='cursor-pointer'
                          onClick={() => handleUpdateCollege(college)}
                        >
                          <Recycle className='mr-2 size-4' />
                          <span>Update College</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='mb-1 mt-3 cursor-pointer bg-destructive/5 hover:bg-destructive/10'>
                        <Trash2 className='mr-2 size-4 text-destructive ' />
                        <span className='text-destructive '>
                          Delete College
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <UpdateModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onUpdate={handleCollegeUpdate}
                  college={selectedCollege} // Pass the selected service
                />
              </div>
              <div>
                <h2 className='mb-1 font-semibold'>{college.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{college.address}</p>
              </div>
            </li>
          ))}
        </ul>
        <Outlet />
      </Layout.Body>
    </Layout>
  )
}
