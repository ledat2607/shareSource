import mongoose, {Document,Model,Schema} from "mongoose";
import bcrypt from "bcryptjs"; 
const emailRegexPattern: RegExp = /^[^\s@] + [^\s@] +\.[^\s@]+s/;

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  userType: string;
  discountCode: Array<{ discountId: string }>;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email !"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter valid email !",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password !"],
      minlength: [8, "Password must be at least 8 character"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
    userType: {
      type: String,
      default: "Bronze",
    },
    discountCode: [{ discountId: String }],
  },
  { timestamps: true }
);
userSchema.pre<IUser>("save", async function(next){
    if(this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
    next();
})

//compare password 
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;