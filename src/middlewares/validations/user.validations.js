export const createUserValidation = [
  // TODO: completar las validaciones para crear un usuario
  body("username")
    .scape()
    .notEmpty()
    .withMessage("El username es requerido")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El username solo puede contener letras, números y guiones bajos"
    ),

  body("email")
    .scape()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),
  body("role").scape().notEmpty().isIn(["secretary", "administrator"]),

  body("employee_number").scape().unique().require(),

  body("first_name").scape().isLength({ min: 2, max: 50 }),

  body("last_name").scape().isLength({ min: 2, max: 50 }),
];
