import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: 'dlrmsgnl0823@gmail.com',
      password: '12345678',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('This is an error');
    } catch (error) {
      setError('root', {
        message: 'This email is already taken',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <input {...register('email')} type="text" placeholder="Email" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
};
