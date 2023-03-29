import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar, UnstyledButton, createStyles, Stack, rem } from '@mantine/core';
import { AiOutlineHome, AiOutlineHeart, AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { BsCalendar2Date, BsFire } from 'react-icons/bs';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  path: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, path, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Link to={path} >
        <UnstyledButton className={cx(classes.link, { [classes.active]: active })}>
          <Icon size="1.2rem" stroke={1.5} />
        </UnstyledButton>
    </Link>
    
  );
}

const navbarLinkData = [
  { icon: AiOutlineHome, path: ''},
  { icon: AiOutlineHeart, path: 'likes' },
  { icon: AiOutlineSearch, path: 'search' },
  { icon: BiMoviePlay, path: 'now_playing' },
  { icon: BsCalendar2Date, path: 'upcoming' },
  { icon: BsFire, path: 'popular' },
  { icon: AiOutlineStar, path: 'top_rated'}
];

export function NavbarMinimal() {
  
  const location = useLocation();
  let currentIndex = 0;
  if(location.pathname.startsWith('/top_rated')) {
    currentIndex = 6;
  } else if (location.pathname.startsWith('/popular')) {
    currentIndex = 5;
  } else if (location.pathname.startsWith('/upcoming')) {
    currentIndex = 4;
  } else if (location.pathname.startsWith('/now_playing')) {
    currentIndex = 3;
  } else if (location.pathname.startsWith('/search')) {
    currentIndex = 2;
  } else if (location.pathname.startsWith('/likes')) {
    currentIndex = 1;
  }

  useEffect(() => {
    setActive(currentIndex);
  }, [currentIndex]);

  const [active, setActive] = useState(currentIndex);

  const links = navbarLinkData.map((link, index) => (
    <NavbarLink
      {...link}
      path={link.path}
      key={link.path}
      active={index === active}
    />
  ));

  return (
    <Navbar width={{ base: 80 }} p="md" style={{backgroundColor: 'black'}}>
      <Navbar.Section grow>
        <Stack justify="center" spacing={5}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}