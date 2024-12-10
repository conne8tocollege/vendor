import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

const Create = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    address: '',
    vendorType: '',
    contactPerson: '',
    phone: '',
    servingLocation: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    bankName: '',
    branchName: '',
  })
  const [aadharFile, setAadharFile] = useState<File | null>(null)
  const [otherDocuments, setOtherDocuments] = useState<File[]>([])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      vendorType: value,
    }))
  }

  const handleAadharUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAadharFile(event.target.files[0])
    }
  }

  const handleOtherDocumentsUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setOtherDocuments(Array.from(event.target.files))
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Log all form data to the console
    console.log('Form Data:', {
      ...formData,
      aadharFile,
      otherDocuments,
    })
  }

  return (
    <Layout fixed>
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Search />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>
      <Layout.Body className='flex flex-col'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Create New Vendor
          </h1>
          <p className='text-muted-foreground'>
            Fill out the form below to add a new vendor to the system.
          </p>
        </div>
        {/* <Separator className=' shadow mb-2' /> */}
        <ScrollArea className='h-[calc(100vh-200px)] w-full rounded-md border p-4'>
          <Card className=' shadow shadow-primary-foreground'>
            <CardHeader>
              <CardTitle className='text-xl text-primary'>
                Vendor Information
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='companyName'>Vendor Name</Label>
                      <Input
                        id='vendorName'
                        name='vendorName'
                        value={formData.vendorName}
                        onChange={handleInputChange}
                        placeholder='Enter company name'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Enter email address'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='address'>Address</Label>
                      <Textarea
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder='Enter full address'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='vendorType'>Vendor Type</Label>
                      <Select
                        onValueChange={handleSelectChange}
                        value={formData.vendorType}
                      >
                        <SelectTrigger id='vendorType'>
                          <SelectValue placeholder='Select vendor type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='on-field'>On-Field</SelectItem>
                          <SelectItem value='off-field'>Off-Field</SelectItem>
                          <SelectItem value='college'>College</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='aadharCard'>Aadhaar Card</Label>
                      <Input
                        id='aadharCard'
                        type='file'
                        onChange={handleAadharUpload}
                        accept='.pdf,.jpg,.jpeg,.png'
                        required
                      />
                      {aadharFile && (
                        <p className='text-sm text-muted-foreground'>
                          File selected: {aadharFile.name}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='accountNumber'>Account Number</Label>
                      <Input
                        id='accountNumber'
                        name='accountNumber'
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder='Enter account number'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='ifscCode'>IFSC Code</Label>
                      <Input
                        id='ifscCode'
                        name='ifscCode'
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        placeholder='Enter IFSC code'
                        required
                      />
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='contactPerson'>Contact Person</Label>
                      <Input
                        id='contactPerson'
                        name='contactPerson'
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        placeholder="Enter contact person's name"
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone</Label>
                      <Input
                        id='phone'
                        name='phone'
                        type='tel'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Enter phone number'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='servingLocation'>Serving Location</Label>
                      <Input
                        id='servingLocation'
                        name='servingLocation'
                        value={formData.servingLocation}
                        onChange={handleInputChange}
                        placeholder='Enter serving location'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='otherDocuments'>Other Documents</Label>
                      <Input
                        id='otherDocuments'
                        type='file'
                        onChange={handleOtherDocumentsUpload}
                        accept='.pdf,.jpg,.jpeg,.png'
                        multiple
                      />
                      {otherDocuments.length > 0 && (
                        <ul className='text-sm text-muted-foreground'>
                          {otherDocuments.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='upiId'>UPI ID</Label>
                      <Input
                        id='upiId'
                        name='upiId'
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder='Enter UPI ID'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='bankName'>Bank Name</Label>
                      <Input
                        id='bankName'
                        name='bankName'
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder='Enter bank name'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='branchName'>Branch Name</Label>
                      <Input
                        id='branchName'
                        name='branchName'
                        value={formData.branchName}
                        onChange={handleInputChange}
                        placeholder='Enter branch name'
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type='submit'>Create Vendor</Button>
              </CardFooter>
            </form>
          </Card>
        </ScrollArea>
      </Layout.Body>
    </Layout>
  )
}

export default Create
