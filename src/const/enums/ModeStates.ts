export enum FormMode {
  EDIT = 'edit',
  DRAFT = 'draft',
  CREATE = 'create',
}

export enum FilterTaskMode {
  HOME = 'home',
  COMPLETED = 'completed',
}

export enum TaskItemMode {
  DEFAULT = 'task',
  DRAFT = 'draft',
}

/**
 * The value are adapted from tailwindcss
 *
 * {@link https://tailwindcss.com/docs/font-weight}
 *
 * THIN = font-weight: 100, <br>
 * EXTRA_THIN = font-weight: 200,
 * LIGHT = font-weight: 300,
 * NORMAL = font-weight: 400,
 * MEDIUM = font-weight: 500,
 * SEMI_BOLD = font-weight: 600,
 * BOLD = font-weight: 700,
 * EXTRA_BOLD = font-weight: 800,
 * ULTRA_BOLD = font-weight: 900,
 *
 * Note: in order to make this work tailwindcss is required for this project
 */
export enum FontWeightMode {
  NONE = '',
  THIN = 'font-thin',
  EXTRA_THIN = 'font-extra-thin',
  LIGHT = 'font-light',
  NORMAL = 'font-normal',
  MEDIUM = 'font-medium',
  SEMI_BOLD = 'font-semibold',
  BOLD = 'font-bold',
  EXTRA_BOLD = 'font-extrabold',
  ULTRA_BOLD = 'font-black',
}
