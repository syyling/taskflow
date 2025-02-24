import type { Meta, StoryObj } from '@storybook/react';
import OverlappingAvatars from './OverlappingAvatars.tsx';

const meta = {
  title: 'Components/OverlappingAvatars',
  component: OverlappingAvatars,
  tags: ['autodocs'],
  argTypes: {
    users: {
      control: 'object',
      description: '아바타로 표시될 사용자 목록',
    },
  },
} satisfies Meta<typeof OverlappingAvatars>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    users: [{ name: '김철수' }, { name: '이영희' }, { name: '박지민' }],
  },
};

// 많은 사용자가 있는 경우
export const ManyUsers: Story = {
  args: {
    users: Array(5)
      .fill(null)
      .map((_, i) => ({
        name: `User ${i + 1}`,
      })),
  },
};
