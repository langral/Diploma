using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class MagazineContext : IdentityDbContext<User>
    {
        public virtual DbSet<TeacherSubjectMappingModel> TeacherSubjectMappingModel { get; set; }
        public virtual DbSet<GroupTeacherMappingModel> GroupTeacherMappingModel { get; set; }
        public virtual DbSet<GroupSubjectMappingModel> GroupSubjectMappingModel { get; set; }
        public virtual DbSet<Teacher> Teacher { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<Record> Record { get; set; }
        public virtual DbSet<Magazine> Magazine { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<Course> Course { get; set; }

        public MagazineContext(DbContextOptions<MagazineContext> options)
            : base(options)
        { }

        public MagazineContext()
        { }
    }
}
