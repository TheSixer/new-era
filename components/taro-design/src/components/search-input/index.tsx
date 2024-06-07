import { FC, memo, useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import iconDelete from './icon_delete.png'
import iconSearch from './icon_search.png'
import { ISearchInputProps } from './const'
import { View, Input, Text, BaseEventOrig, CoverView, CoverImage, Image } from '@tarojs/components'
import MMIconFont from '../icon-font'
import MMIconFontName from '../icon-font/const'
import { InputProps } from '@tarojs/components/types/Input'

import classNames from 'classnames'

const Component: FC<ISearchInputProps> = (props) => {
  const { defaultValue = '', readonly = false, searchText = '搜索', clear, placeholder, focus = false, className, style } = props

  const [stateValue, setStateValue] = useState('')

  useEffect(() => {
    setStateValue(defaultValue)
  }, [defaultValue])

  const handleInput = (ev: BaseEventOrig<InputProps.inputEventDetail>) => {
    const value = ev.detail.value || ''
    setStateValue(value)
  }

  const handleConfirm = () => {
    props.onSearch?.(stateValue)
  }

  const handleFocus = (ev: BaseEventOrig<InputProps.inputForceEventDetail>) => {
    props.onFocus?.(ev)
  }

  const handBlur = (ev: BaseEventOrig<InputProps.inputValueEventDetail>) => {
    props.onBlur?.(ev)
  }

  const showClear = !!stateValue && clear

  const inputRef = useRef<any>()
  useEffect(() => {
    if (!focus) {
      // h5收起键盘。
      document?.activeElement?.blur?.()
    }
  }, [focus])

  return (
    <View className={classNames(styles.searchInputStyle, className)} style={style}>
      <View className={classNames(styles.searchContent, showClear && styles.clear)}>
        {/* <MMIconFont value={MMIconFontName.Search} size={14} color="#cccccc" /> */}
        <Image src={iconSearch} className={styles.search} />
        <View className={styles.searcInput}>
          <Input
            ref={inputRef}
            value={stateValue}
            placeholder={placeholder}
            placeholderStyle="color: #cccccc"
            focus={focus}
            onInput={handleInput}
            onConfirm={handleConfirm}
            onFocus={handleFocus}
            onBlur={handBlur}
            disabled={readonly}
            className={styles.input}
          />
          <View
            style={{ display: showClear ? undefined : 'none' }}
            className={styles.iconDelWrapper}
            catchMove
            onTouchStart={(ev) => {
              ev.preventDefault()
              ev.stopPropagation()
              setStateValue('')
              props.onClear?.()
            }}
          >
            <Image src={iconDelete} className={styles.iconDel} />
          </View>
          {/* 部分机型不显示???? */}
          {/* <CoverView */}
          {/*  style={{ display: showClear ? undefined : 'none' }} */}
          {/*  className={styles.iconDelWrapper} */}
          {/*  catchMove */}
          {/*  onTouchStart={(ev) => { */}
          {/*    ev.preventDefault() */}
          {/*    ev.stopPropagation() */}
          {/*    setStateValue('') */}
          {/*    props.onClear?.() */}
          {/*  }} */}
          {/* > */}
          {/*  <CoverImage src={iconDelete} className={styles.iconDel} /> */}
          {/* </CoverView> */}
        </View>
      </View>

      {(props.renderSuffix || searchText) && (
        <View className={styles.rightContent} onClick={(ev) => ev.stopPropagation()}>
          {props.renderSuffix}
          {!props.renderSuffix && (
            <Text
              onClick={() => {
                props.onSearch?.(stateValue)
              }}
            >
              {searchText}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}

const SearchInput = memo(Component)

export default SearchInput
