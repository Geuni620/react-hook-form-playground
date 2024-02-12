import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  email: string;
  password: string;
};

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
      <input
        {...register('email', {
          required: 'This is required',
          validate: (value) => {
            if (!value.includes('@')) {
              return 'This is not a valid email';
            }

            return true;
          },
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        {...register('password', {
          required: 'This is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        type="password"
        placeholder="Password"
      />
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
