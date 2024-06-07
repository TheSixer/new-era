export interface ICommentFormProps {
  goodsImg: string
  goodsName: string
  comment: string
  imagesUrl: string[]
  enableStar?: boolean
  enableAnonymous?: boolean
  star?: number
  anonymous?: boolean
  imagesCount?: number
  onCommentChange(comment: string): void
  onImagesUrlChange(imagesUrl: string[]): void
  onStarChange?(star: number): void
  onAnonymousChange?(isAnonymous: boolean): void
}
