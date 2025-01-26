import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface IArticleParamsForm {
	applyFormState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ applyFormState }: IArticleParamsForm) => {
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!formRef?.current?.contains(event.target as Node)) {
				console.log('INNER');
				setIsFormOpen(false);
			}
		};

		if (isFormOpen) {
			document.addEventListener('mousedown', handleClick);
		} else {
			document.removeEventListener('mousedown', handleClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleOptionChange = (option: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prevFormState) => ({
				...prevFormState,
				[option]: value,
			}));
		};
	};

	const handleApplyButton = (e: SyntheticEvent) => {
		e.preventDefault();
		applyFormState(formState);
	};

	const handleResetButton = () => {
		setFormState(defaultArticleState);
		applyFormState(defaultArticleState);
	};

	return (
		<div ref={formRef}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				className={
					styles.container + ' ' + (isFormOpen ? styles.container_open : '')
				}>
				<form className={styles.form} onSubmit={handleApplyButton}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						onChange={handleOptionChange('fontFamilyOption')}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={formState.fontSizeOption.value}
						onChange={handleOptionChange('fontSizeOption')}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
					/>
					<Select
						onChange={handleOptionChange('fontColor')}
						selected={formState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						onChange={handleOptionChange('backgroundColor')}
						selected={formState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
					/>
					<Select
						onChange={handleOptionChange('contentWidth')}
						selected={formState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleResetButton}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
