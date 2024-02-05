import { useUnit } from 'effector-react';
import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { $mode } from '@/context/mode';
import { IWrappedComponentProps } from '@/types/common';
import ProfileSvg from '@/components/elements/ProfileSvg/ProfileSvg';
import LogoutSvg from '@/components/elements/LogoutSvg/LogoutSvg';
import { withClickOutside } from '@/utils/withClickOutside';
import styles from '@/styles/profileDropDown/index.module.scss';

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const mode = useUnit($mode);
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

    const toggleProfileDropDown = () => setOpen(!open);

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: 'right top' }}>
              <li className={styles.profile__dropdown__user}>
                <span
                  className={`${styles.profile__dropdown__username} ${darkModeClass}`}>
                  Ivan
                </span>
                <span
                  className={`${styles.profile__dropdown__email} ${darkModeClass}`}>
                  ivan@mail.ru
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button className={styles.profile__dropdown__item__btn}>
                  <span
                    className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>
                    Выйти
                  </span>
                  <span
                    className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ProfileDropdown.displayName = 'ProfileDropDown';

export default withClickOutside(ProfileDropdown);
