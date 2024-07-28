// Inspired by https://github.com/zbycz/osmapp/blob/master/src/services/helpers.ts#L107

import styled from 'styled-components'

export const addressKeys = [
	'addr:place',
	'addr:street',
	'addr:housenumber',
	'addr:city',
	'addr:state',
	'addr:postcode',
	'contact:city',
	'contact:housenumber',
	'contact:postcode',
	'contact:street',
]

export default function Address({ tags, noPrefix }) {
	return (
		<address
			css={`
				line-height: 1.4rem;
				font-size: 90%;
				font-style: normal;
			`}
		>
			{buildAddress(tags, noPrefix)}
		</address>
	)
}

export const buildAddress = (t: object, noPrefix = false) => {
	const g = (key) => {
		const value = noPrefix ? t[key] : t[`addr:` + key] || t['contact:' + key]
		return value || ''
	}

	// This bit of code is ugly, sorry, but had to make it work fast, there's
	// plenty of things more important than a beautiful address for now
	const firstPart =
		g('housenumber') || g('street') ? `${g('housenumber')} ${g('street')}` : ''
	const address = `${firstPart} ${
		firstPart && (g('postcode') || g('city') || g('state')) ? ', ' : ''
	} ${g('postcode')} ${g('city')} ${g('state')}
`
	if (address.trim() === '') return null
	return address
}

export const AddressDisc = ({ t, noPrefix = false }) => {
	const g = (key) => {
		const value = noPrefix ? t[key] : t[`addr:` + key] || t['contact:' + key]
		if (value == null) return ''
		const shorterValue = [
			['avenue', 'av.'],
			['boulevard', 'bd.'],
			['rue', 'r.'],
			['carrefour', 'car.'],
		].reduce((memo, [from, to]) => memo.replace(from, to), value.toLowerCase())
		return shorterValue || ''
	}
	return (
		<AddressDiscContainer>
			<strong>{g('housenumber')}</strong>
			<span>{g('street')}</span>
		</AddressDiscContainer>
	)
}

export const AddressDiscContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.6rem 0;
	justify-content: space-between;
	width: 4rem;
	height: 4rem;
	border-radius: 4rem;
	background: var(--darkColor);
	color: white;
	font-size: 80%;
	overflow: hidden;
	> span,
	> strong {
		text-align: center;
		line-height: 0.9rem;
		max-width: 4rem;
	}
	img {
		filter: invert(0) !important;
	}
`
