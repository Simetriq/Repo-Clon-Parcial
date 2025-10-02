import bcrypt from "bcryptjs";
import { UserModel } from "../models/mongoose/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken, verifyToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      rol,
      employee_number,
      first_name,
      last_name,
      phone,
    } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [
        { email },
        { username },
        { "profile.employee_number": employee_number },
      ],
    });

    const hash = await hashPassword(password);

    const userCreate = await UserModel.create({
      username,
      email,
      password: hash,
      rol,
      profile: { employee_number, first_name, last_name, phone: phone || null },
    });

    return res
      .status(201)
      .json({ msg: "Usuario registrado correctamente", data: userCreate });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ msg: "el usuario no existe" });

    const validPassword = await comparePassword(password, user.password);

    const token = signToken({
      userId: user._id,
      role: user.role,
      username: user.username,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const tokenPayload = req.user;

    const user = await UserModel.findById(tokenPayload.userId);

    return res.status(200).json({ data: user.profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Sesión cerrada correctamente" });
};
