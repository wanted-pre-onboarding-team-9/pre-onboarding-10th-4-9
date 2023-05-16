import { useSearchDispatch, useSearchState } from '../context/SearchContext';

interface DropdownItemProps {
  index: number;
  children: string;
  isFocus: boolean;
}

const DropdownItem = ({ index, children: suggestion, isFocus }: DropdownItemProps) => {
  const { inputText } = useSearchState();
  const { hoverSuggestion, inactivate, changeInputText } = useSearchDispatch();
  const onMouseEnter = () => hoverSuggestion(index);

  const onClick = () => {
    // TODO: 리스트에서 추천어를 클릭할 경우, submit todo 함수를 호출하여 등록 => 검색어를 초기화 시켜 드롭다운을 닫음
    changeInputText('');
  };

  const keywordRegex = new RegExp(`(${inputText})`, 'gi');
  const texts = suggestion.split(keywordRegex);

  return (
    <button
      type="button"
      className={`${isFocus ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={inactivate}
      onClick={onClick}
    >
      {texts.map((text, idx) => {
        const key = text + idx;
        if (keywordRegex.test(text)) {
          return (
            <span className="sugegestion-item-text sugegestion-item-keyword" key={key}>
              {text}
            </span>
          );
        }
        return (
          <span className="sugegestion-item-text" key={key}>
            {text}
          </span>
        );
      })}
    </button>
  );
};

export default DropdownItem;
