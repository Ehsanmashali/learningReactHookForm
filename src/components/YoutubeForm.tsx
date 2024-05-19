import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};

const YoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
    },
  });
  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required.",
            },
          })}
        />
        <p className="error">{errors?.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address.",
            },
            // validate: (fieldValidate) => {
            //  return fieldValidate !== "ad@gm.co" || "Enter a different email address"
            // },
            validate: {
              notAdmin: (fieldValidate) => {
                return (
                  fieldValidate !== "admin@gmail.com" ||
                  "Enter a different email address."
                );
              },
              notBlackListd: (fieldValidate) => {
                return (
                  !fieldValidate.endsWith("badDomain.com") ||
                  "This Domain is not supported."
                );
              },
            },
          })}
        />
        <p className="error">{errors?.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Channel is required,",
            },
          })}
        />
        <p className="error">{errors?.channel?.message}</p>

        <label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter", {
            required: {
              value: true,
              message: "twitter is required",
            },
          })}
        />
        <p className="error">{errors?.social?.twitter?.message}</p>

        <label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          {...register("social.facebook", {
            required: {
              value: true,
              message: "facebook is required",
            },
          })}
        />
        <p className="error">{errors?.social?.facebook?.message}</p>

        <label htmlFor="primary-phone">primary phone number</label>
        <input
          type="text"
          id="primary"
          {...register("phoneNumbers.0", {
            required: {
              value: true,
              message: "phone is required ",
            },
          })}
        />

        <p className="error">
          {errors?.phoneNumbers && errors?.phoneNumbers[0]?.message}
        </p>

        <label htmlFor="secondary-phone">secondary phone number</label>
        <input type="text" id="primary" {...register("phoneNumbers.1")} />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
