import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import { useState } from 'react'

const AddLeads = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    college: '',
    course: '',
    leadSource: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Handle form submission here
    console.log('Form submitted with data:', formData)
  }

  return (
    <Layout>
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
      <Layout.Body className='flex flex-col overflow-y-auto'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold tracking-tight'>Add New Lead</h1>
          <p className='text-muted-foreground'>
            Fill in the details below to add a new lead to the system.
          </p>
        </div>
        <Separator className='mb-6' />

        <Card className='mx-auto w-full max-w-6xl'>
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder='First Name'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder='Last Name'
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
                      onChange={handleChange}
                      placeholder='email@example.com'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder='+91 1234567890'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='college'>College</Label>
                    <Select
                      name='college'
                      onValueChange={(value) =>
                        handleChange({
                          target: { name: 'college', value },
                        } as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a college' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='college1'>College 1</SelectItem>
                        <SelectItem value='college2'>College 2</SelectItem>
                        <SelectItem value='college3'>College 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='course'>Course</Label>
                    <Select
                      name='course'
                      onValueChange={(value) =>
                        handleChange({
                          target: { name: 'course', value },
                        } as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a course' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='course1'>Course 1</SelectItem>
                        <SelectItem value='course2'>Course 2</SelectItem>
                        <SelectItem value='course3'>Course 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='address1'>Address Line 1</Label>
                    <Input
                      id='address1'
                      name='address1'
                      value={formData.address1}
                      onChange={handleChange}
                      placeholder='Address Line 1'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='address2'>Address Line 2</Label>
                    <Input
                      id='address2'
                      name='address2'
                      value={formData.address2}
                      onChange={handleChange}
                      placeholder='Address Line 2 (Optional)'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      placeholder='City'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>State</Label>
                    <Input
                      id='state'
                      name='state'
                      value={formData.state}
                      onChange={handleChange}
                      placeholder='State'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='zipCode'>Zip Code</Label>
                    <Input
                      id='zipCode'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder='Zip Code'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='leadSource'>Lead Source</Label>
                    <Select
                      name='leadSource'
                      onValueChange={(value) =>
                        handleChange({
                          target: { name: 'leadSource', value },
                        } as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a lead source' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='website'>Website</SelectItem>
                        <SelectItem value='referral'>Referral</SelectItem>
                        <SelectItem value='socialMedia'>
                          Social Media
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button type='submit' className='w-full'>
                Add Lead
              </Button>
            </form>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default AddLeads
