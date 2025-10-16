import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function Form() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            termsOfService: false,
        },

        validate: {
            name: (value) => (/^\S+$/.test(value) ? null : 'Invalid name'),
            surname: (value) => (/^\S+$/.test(value) ? null : 'Invalid surname'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

  return (
    <>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Group>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />

                <TextInput
                    withAsterisk
                    label="Surname"
                    placeholder="surname"
                    key={form.key('surname')}
                    {...form.getInputProps('surname')}
                />
            </Group>
            <Group>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="Phone"
                    placeholder="+666 6666 6666"
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                />
            </Group>

            <Checkbox
                mt="md"
                label="I agree to sell my privacy"
                key={form.key('termsOfService')}
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    </>
  );
}

export default Form