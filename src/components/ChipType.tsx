import React, { FC } from 'react';

import { INamedApiResource, IType } from 'pokeapi-typescript';

import Chip, { ChipProps } from '!/components/Chip';
import usePokeApi from '!/hooks/use-poke-api';
import getIdFromUrl from '!/utils/get-id-from-url';

interface Props extends ChipProps {
  type?: INamedApiResource<IType>;
}

const mutateData = ({ names }: IType): Partial<IType> => ({ names });

const ChipType: FC<Props> = ({ type, ...rest }) => {
  const { data } = usePokeApi({
    endpoint: 'Type',
    id: type?.url ? getIdFromUrl(type.url) : undefined,
    page: undefined,
    mutateData,
  });

  const name = data?.names?.find((e) => e.language.name === 'en')?.name;

  if (!name) {
    return null;
  }

  return <Chip {...rest}>{name}</Chip>;
};

export default ChipType;
