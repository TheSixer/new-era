export interface IFormProps {}

export interface IMMFormInstance<Values extends Record<string, any> = any> {
  // /** 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值	 */
  // getFieldsValue(): Promise<Values>
  /** 触发表单验证	 */
  validateFields(): Promise<Values>
}
