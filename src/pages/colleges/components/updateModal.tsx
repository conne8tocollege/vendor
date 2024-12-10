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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/custom/button'
import { College } from '@/containers/interfaces'
import { PenBoxIcon } from 'lucide-react'

interface UpdateModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedCollege: College) => void
  college: College | null
}

export function UpdateModal({
  isOpen,
  onClose,
  onUpdate,
  college,
}: UpdateModalProps) {
  const [updatedCollege, setupdatedCollege] = useState<College | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (college) {
      setupdatedCollege(college)
    }
  }, [college])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (updatedCollege) {
      setupdatedCollege((prevService) => ({
        ...prevService!,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (updatedCollege) {
      onUpdate(updatedCollege)
      onClose()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setupdatedCollege({
        ...updatedCollege!, // Spread the existing college state
        imageUrl, // Update the image URL
      })
    }
  }

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  if (!updatedCollege) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[80vh] overflow-y-auto sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Update {updatedCollege.name}</DialogTitle>
          <DialogDescription>
            Make changes to your college here. Click save when you're done.
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
                  value={updatedCollege.name}
                  onChange={handleChange}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='address' className='text-right'>
                  Address
                </Label>
                <Input
                  id='address'
                  name='address'
                  value={updatedCollege.address}
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
                  value={updatedCollege.imageUrl}
                  onChange={handleChange}
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='isRanked' className='text-right'>
                  Is Ranked
                </Label>
                <Select
                  value={updatedCollege.isRanked ? 'yes' : 'no'}
                  onValueChange={(value) =>
                    setupdatedCollege({
                      ...updatedCollege!,
                      isRanked: value === 'yes',
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select option' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Is Ranked</SelectLabel>
                      <SelectItem value='yes'>Yes</SelectItem>
                      <SelectItem value='no'>No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                src={updatedCollege.imageUrl}
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
