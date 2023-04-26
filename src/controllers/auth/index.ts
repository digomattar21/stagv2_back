import { Request, Response } from "express";
import { validateLoginInput } from "../../util/validation/login";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegisterInput } from "../../util/validation/register";
import gravatar from "gravatar";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      throw errors;
    }

    const email: String = req.body.email;
    const password: any = req.body.password;

    const user: any = await User.findOne({ email });
    if (!user) {
      errors.email = "User not found";
      throw errors;
    }

    const matched: boolean = await bcrypt.compare(password, user.password);
    if (!matched) {
      errors.password = "Incorrect Password";
      throw errors;
    }

    const payload: any = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };

    const token: string = await jwt.sign(payload, `${process.env.JWT_SECRET}`);

    res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (error: any) {
    res.status(400).json(error);
  }
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { errors, isValid }: any = validateRegisterInput(req.body);

    if (!isValid) {
      throw errors;
    }

    const user: any = await User.findOne({ email: req.body.email });
    if (user) {
      errors.email = "Email already exists";
      throw errors;
    }

    const avatar: any = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const newUser: any = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: avatar,
    });

    const salt: any = await bcrypt.genSalt(10);

    const hash: any = await bcrypt.hash(newUser.password, salt);

    newUser.password = hash;

    const savedUser: any = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error: any) {
    res.status(400).json(error);
  }
};
