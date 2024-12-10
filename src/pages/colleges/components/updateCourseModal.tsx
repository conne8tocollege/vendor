import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { Course } from '@/containers/interfaces'
import { PenBoxIcon } from 'lucide-react'

interface UpdateCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedCourse: Course) => void
  course: Course | null
}

export function UpdateCourseModal({
  isOpen,
  onClose,
  onUpdate,
  course,
}: UpdateCourseModalProps) {
  const [updatedCourse, setupdatedCourse] = useState<Course | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (course) {
      setupdatedCourse(course)
    }
  }, [course])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (updatedCourse) {
      setupdatedCourse((prevService) => ({
        ...prevService!,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (updatedCourse) {
      onUpdate(updatedCourse)
      onClose()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setupdatedCourse({
        ...updatedCourse!, // Spread the existing course state
        imageUrl, // Update the image URL
      })
    }
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  if (!updatedCourse) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Update {updatedCourse.name}</DialogTitle>
          <DialogDescription>
            Make changes to your course here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Main Grid Layout */}
        <div className='grid grid-cols-[3fr_1fr] gap-8'>
          {/* Form Section */}
          <form onSubmit={handleSubmit} className='w-full'>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  name='name'
                  value={updatedCourse.name}
                  onChange={handleChange}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='address' className='text-right'>
                  Description
                </Label>
                <Input
                  id='description'
                  name='description'
                  value={updatedCourse.description}
                  onChange={handleChange}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='address' className='text-right'>
                  Fees
                </Label>
                <Input
                  type='number'
                  id='fees'
                  name='fess'
                  value={updatedCourse.fees}
                  onChange={handleChange}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='imageUrl' className='text-right'>
                  Image URL
                </Label>
                <Input
                  id='imageUrl'
                  name='imageUrl'
                  value={updatedCourse.imageUrl}
                  onChange={handleChange}
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>

          {/* Image Section */}
          <div className='flex flex-col items-center justify-center'>
            <div className='relative'>
              <img
                src={updatedCourse.imageUrl}
                className='h-36 w-36 rounded-lg object-contain'
                alt='Service Image'
              />
              <span className='right-1 top-1'>
                <PenBoxIcon
                  className='mr-2 size-4 cursor-pointer'
                  onClick={handleIconClick}
                />
              </span>
            </div>
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
