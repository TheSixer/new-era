import { ECodeScene } from "~/enums/ECodeScene";

export interface IRegisterFormProps {
  scene?: ECodeScene;
  onLoginClick(): void
}
